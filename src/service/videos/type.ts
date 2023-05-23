export interface VideosType {
  data: Array<VideoType>
}

export interface VideoType {
  id: string
  path: string
}

export interface SliceUpdateType {
  hash: number
}
