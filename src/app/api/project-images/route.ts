import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export interface ProjectMedia {
  url: string
  type: 'image' | 'video'
}

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'public', 'projects')
    
    // Check if the projects directory exists, if not, return empty map
    if (!fs.existsSync(projectsDir)) {
      return NextResponse.json({})
    }
    
    const projectFolders = fs.readdirSync(projectsDir)
    const result: Record<string, ProjectMedia[]> = {}
    
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov']
    
    for (const folder of projectFolders) {
      const folderPath = path.join(projectsDir, folder)
      const stat = fs.statSync(folderPath)
      
      if (stat.isDirectory()) {
        const files = fs.readdirSync(folderPath)
        const mediaList = files
          .map(file => {
            const ext = path.extname(file).toLowerCase()
            const isImage = imageExtensions.includes(ext)
            const isVideo = videoExtensions.includes(ext)
            
            if (isImage) {
              return { url: `/projects/${folder}/${file}`, type: 'image' as const, name: file }
            } else if (isVideo) {
              return { url: `/projects/${folder}/${file}`, type: 'video' as const, name: file }
            }
            return null
          })
          .filter((item): item is { url: string; type: 'image' | 'video'; name: string } => item !== null)
          .sort((a, b) => {
            // Put files containing "cover" or starting with "1" / "01" first
            const aIsCover = a.name.toLowerCase().includes('cover') || a.name.toLowerCase().startsWith('1') || a.name.toLowerCase().startsWith('01')
            const bIsCover = b.name.toLowerCase().includes('cover') || b.name.toLowerCase().startsWith('1') || b.name.toLowerCase().startsWith('01')
            if (aIsCover && !bIsCover) return -1
            if (!aIsCover && bIsCover) return 1
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
          })
          .map(({ url, type }) => ({ url, type }))
          
        result[folder] = mediaList
      }
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error reading project media files:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
