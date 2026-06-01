import { Cause, Effect, Exit, Match } from "effect";
import { useEffect, useState, type DependencyList } from "react";

export type EffectResourceState<A> =
  | {
      readonly status: "idle" | "loading";
      readonly data: null;
      readonly error: null;
    }
  | {
      readonly status: "success";
      readonly data: A;
      readonly error: null;
    }
  | {
      readonly status: "failure";
      readonly data: null;
      readonly error: string;
    };

type EffectResourceSuccess<A> = Extract<EffectResourceState<A>, { readonly status: "success" }>;

type EffectResourceFailure<A> = Extract<EffectResourceState<A>, { readonly status: "failure" }>;

const isResourceSuccess = <A>(state: EffectResourceState<A>): state is EffectResourceSuccess<A> =>
  state.status === "success";

const isResourceFailure = <A>(state: EffectResourceState<A>): state is EffectResourceFailure<A> =>
  state.status === "failure";

const initialResourceState = {
  status: "idle",
  data: null,
  error: null,
} as const;

type EffectResourceFactory<A, E> = () => Effect.Effect<A, E, never>;

/**
 * Runs an Effect resource when dependencies change.
 *
 * Create the Effect inside `createResource` and list any captured values in
 * `dependencies`; passing an already-created inline Effect would otherwise
 * create a new object on every render.
 */
export function useEffectResource<A, E>(
  createResource: EffectResourceFactory<A, E>,
  dependencies: DependencyList = [],
): EffectResourceState<A> {
  const [state, setState] = useState<EffectResourceState<A>>(initialResourceState);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const resource = createResource();

    setState({ status: "loading", data: null, error: null });

    Effect.runPromiseExit(resource, { signal: controller.signal }).then((exit) => {
      if (!isMounted) return;

      if (Exit.isSuccess(exit)) {
        setState({ status: "success", data: exit.value, error: null });
        return;
      }

      setState({
        status: "failure",
        data: null,
        error: Cause.pretty(exit.cause),
      });
    });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, dependencies);

  return state;
}

export function matchEffectResource<A, R>(
  state: EffectResourceState<A>,
  handlers: {
    readonly onLoading: () => R;
    readonly onFailure: (error: string) => R;
    readonly onSuccess: (data: A) => R;
  },
): R {
  return Match.value(state).pipe(
    Match.when(isResourceSuccess<A>, ({ data }) => handlers.onSuccess(data)),
    Match.when(isResourceFailure<A>, ({ error }) => handlers.onFailure(error)),
    Match.orElse(() => handlers.onLoading()),
  ) as R;
}
