import { readFile, writeFile, access } from 'fs/promises'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'src/data')

export async function readData<T>(filename: string): Promise<T[]> {
  const filePath = join(DATA_DIR, filename)
  try {
    await access(filePath)
    const content = await readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  const filePath = join(DATA_DIR, filename)
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function readText(filename: string): Promise<string> {
  const filePath = join(DATA_DIR, filename)
  try {
    await access(filePath)
    return await readFile(filePath, 'utf-8')
  } catch {
    return ''
  }
}

export async function writeText(filename: string, content: string): Promise<void> {
  const filePath = join(DATA_DIR, filename)
  await writeFile(filePath, content, 'utf-8')
}
