import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// eslint-disable-next-line no-undef
export const getPath = (folder: string) => path.join(process.cwd(), `/${folder}`) // Get full path

export const getFileContent = (filename: string, folder: string) => {
  const contentDir = getPath(folder)
  return fs.readFileSync(path.join(contentDir, filename), 'utf8')
}

export const getAllPosts = (folder: string) => {
  const contentDir = getPath(folder)
  const files = fs.readdirSync(contentDir)
  const data = files.map((fileName) => {
    const source = getFileContent(fileName, folder)
    const slug = fileName.split('.')[0]
    const { data: frontmatter } = matter(source)
    return {
      frontmatter,
      slug,
    }
  })
  return data
}

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder)
  const { data: frontmatter, content } = matter(source)

  return {
    frontmatter,
    content,
  }
}
