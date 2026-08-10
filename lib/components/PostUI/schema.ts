import { Schema } from "effect";

const StackGapSchema = Schema.Literal("small", "medium", "large");
const OptionalStackGapSchema = Schema.optional(StackGapSchema);
const StackPropsStructureSchema = Schema.Struct({ gap: OptionalStackGapSchema });

export const StackPropsSchema = StackPropsStructureSchema.pipe(
  Schema.filter((props) => !Array.isArray(props), {
    jsonSchema: {
      type: "object",
      properties: { gap: { enum: ["small", "medium", "large"] } },
      additionalProperties: false,
    },
  }),
);

export const TextPropsSchema = Schema.Struct({ text: Schema.String });

const ChartLabelsSchema = Schema.Array(Schema.String);
const ChartValuesSchema = Schema.Array(Schema.Number);
const OptionalChartXLabelSchema = Schema.optional(Schema.String);
const OptionalChartYLabelSchema = Schema.optional(Schema.String);
const OptionalChartMinSchema = Schema.optional(Schema.Number);
const OptionalChartMaxSchema = Schema.optional(Schema.Number);

const BarChartPropsStructureSchema = Schema.Struct({
  title: Schema.String,
  labels: ChartLabelsSchema,
  values: ChartValuesSchema,
  xLabel: OptionalChartXLabelSchema,
  yLabel: OptionalChartYLabelSchema,
  min: OptionalChartMinSchema,
  max: OptionalChartMaxSchema,
});

const hasMatchingChartData = (props: Schema.Schema.Type<typeof BarChartPropsStructureSchema>) => {
  const hasData = props.labels.length > 0;
  const hasMatchingLengths = props.labels.length === props.values.length;
  return hasData && hasMatchingLengths;
};

export const BarChartPropsSchema = BarChartPropsStructureSchema.pipe(
  Schema.filter(hasMatchingChartData),
);

const OptionalMetricDetailSchema = Schema.optional(Schema.String);
const MetricSchema = Schema.Struct({
  label: Schema.String,
  value: Schema.String,
  detail: OptionalMetricDetailSchema,
});
const MetricItemsSchema = Schema.Array(MetricSchema);

export const MetricGridPropsSchema = Schema.Struct({ items: MetricItemsSchema });

const CalloutToneSchema = Schema.Literal("neutral", "warning", "positive");
const OptionalCalloutToneSchema = Schema.optional(CalloutToneSchema);
export const CalloutPropsSchema = Schema.Struct({
  title: Schema.String,
  text: Schema.String,
  tone: OptionalCalloutToneSchema,
});

const HttpUrlSchema = Schema.String.pipe(Schema.pattern(/^https?:\/\//));

const SourceSchema = Schema.Struct({
  link: HttpUrlSchema,
  author: Schema.String,
  publication: Schema.String,
});
const SourcesSchema = Schema.Array(SourceSchema);

export const SourceListPropsSchema = Schema.Struct({ sources: SourcesSchema });

const ElementChildrenSchema = Schema.Array(Schema.String);

const createElementSchema = <Type extends string, Props extends Schema.Schema.Any>(
  type: Type,
  props: Props,
) => {
  const TypeSchema = Schema.Literal(type);

  return Schema.Struct({ type: TypeSchema, props, children: ElementChildrenSchema });
};

const StackElementSchema = createElementSchema("Stack", StackPropsSchema);
const TextElementSchema = createElementSchema("Text", TextPropsSchema);
const BarChartElementSchema = createElementSchema("BarChart", BarChartPropsSchema);
const MetricGridElementSchema = createElementSchema("MetricGrid", MetricGridPropsSchema);
const CalloutElementSchema = createElementSchema("Callout", CalloutPropsSchema);
const SourceListElementSchema = createElementSchema("SourceList", SourceListPropsSchema);

export const PostUIElementSchema = Schema.Union(
  StackElementSchema,
  TextElementSchema,
  BarChartElementSchema,
  MetricGridElementSchema,
  CalloutElementSchema,
  SourceListElementSchema,
);

const PostUIElementsSchema = Schema.Record({
  key: Schema.String,
  value: PostUIElementSchema,
});

export const PostUISpecStructureSchema = Schema.Struct({
  root: Schema.String,
  elements: PostUIElementsSchema,
});

type PostUISpecStructure = Schema.Schema.Type<typeof PostUISpecStructureSchema>;
export type PostUIElement = Schema.Schema.Type<typeof PostUIElementSchema>;

const toChildReferences = ([parent, element]: [string, PostUIElement]) =>
  element.children.map((child) => ({ child, parent }));

const findMissingChild = (spec: PostUISpecStructure) => {
  const references = Object.entries(spec.elements).flatMap(toChildReferences);
  return references.find(({ child }) => !spec.elements[child]);
};

const hasCycleFrom = (spec: PostUISpecStructure, key: string, path: readonly string[]): boolean => {
  if (path.includes(key)) return true;

  const children = spec.elements[key]?.children ?? [];
  const nextPath = path.concat(key);
  return children.some((child) => hasCycleFrom(spec, child, nextPath));
};

const findCyclicElement = (spec: PostUISpecStructure) =>
  Object.keys(spec.elements).find((key) => hasCycleFrom(spec, key, []));

const validateSpecGraph = (spec: PostUISpecStructure) => {
  if (!spec.elements[spec.root]) return `Root element "${spec.root}" does not exist.`;

  const missingChild = findMissingChild(spec);
  if (missingChild) {
    return `Element "${missingChild.parent}" references missing child "${missingChild.child}".`;
  }

  const cyclicElement = findCyclicElement(spec);
  if (!cyclicElement) return true;

  return `Element "${cyclicElement}" belongs to a cycle.`;
};

export const PostUISpecSchema = PostUISpecStructureSchema.pipe(Schema.filter(validateSpecGraph));

export type PostUISpec = Schema.Schema.Type<typeof PostUISpecSchema>;

export const decodePostUISpec = Schema.decodeUnknown(PostUISpecSchema, {
  onExcessProperty: "error",
});

export const decodePostUISpecSync = Schema.decodeUnknownSync(PostUISpecSchema, {
  onExcessProperty: "error",
});
