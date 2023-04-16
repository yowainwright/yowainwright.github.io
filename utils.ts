import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import sanitize from 'sanitize-filename'

// eslint-disable-next-line no-undef
export const getPath = (folder: string) => path.join(process.cwd(), `/${folder}`) // Get full path

export const getFileContent = (filename: string, folder: string) => {
  const contentDir = getPath(folder)
  const file = sanitize(filename)
  return fs.readFileSync(path.join(contentDir, file), 'utf8')
}

export const getAllPosts = (folder: string) => {
  const contentDir = getPath(folder)
  const files = fs.readdirSync(contentDir)
  return files.map((fileName) => {
    const source = getFileContent(fileName, folder)
    const slug = fileName.split('.')[0]
    const { data: frontmatter } = matter(source)
    const { date, ...rest } = frontmatter
    const prettyDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    return {
      frontmatter: {
        ...rest,
        date: prettyDate,
      },
      slug,
    }
  })
}



export const getAllPostsArchive = (folder: string) => {
  const posts = getAllPosts(folder)
  return posts.filter(({ slug }: any) => !['404', 'about', 'resume'].includes(slug)).sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
}

export const getAllNewPosts = (folder: string) => {
  const posts = getAllPosts(folder)
  return posts.filter(({ slug }: any) => !['404', 'about', 'resume'].includes(slug)).sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)).slice(0, 10);
}

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder)
  const { data: frontmatter, content } = matter(source)
  const { date, ...rest } = frontmatter
  const prettyDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return {
    frontmatter: {
      ...rest,
      date: prettyDate,
    },
    content,
  }
}
