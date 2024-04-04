import React, { useMemo } from 'react'

import { Badge } from '@janhq/uikit'
import { useAtomValue } from 'jotai'

import { importingHuggingFaceRepoDataAtom } from '@/helpers/atoms/HuggingFace.atom'

const ModelSegmentInfo: React.FC = () => {
  const importingHuggingFaceRepoData = useAtomValue(
    importingHuggingFaceRepoDataAtom
  )

  const { author, modelName, format, modelUrl } = useMemo(() => {
    const author =
      (importingHuggingFaceRepoData?.cardData['model_creator'] as string) ??
      'N/A'
    const modelName =
      (importingHuggingFaceRepoData?.cardData['model_name'] as string) ?? 'N/A'
    const format = 'GGUF' // since currently we only support GGUF
    const modelUrl = 'https://huggingface.co/' // TODO: get model URL

    return {
      author,
      modelName,
      format,
      modelUrl,
    }
  }, [importingHuggingFaceRepoData])

  if (!importingHuggingFaceRepoData) return null

  // TODO: find the correct description somehow lol
  const description = `MetaAI has released Code Llama, a comprehensive family of large language models for code. These models are based on Llama 2 and exhibit state-of-the-art performance among openly available models. They offer advanced infilling capabilities, can accommodate large input contexts, and have the ability to follow instructions for programming tasks without prior training. There are various versions available to cater to a wide array of applications: foundation models (Code Llama), Python-specific.`

  return (
    <div className="flex w-full flex-1 flex-col space-y-4">
      <HeaderInfo title={'About'} value={description} />

      {/* first row */}
      <div className="flex space-x-2">
        <HeaderInfo title="Author" value={author} />

        <HeaderInfo title="Model ID" value={modelName} />

        <HeaderInfo title="Format" value={format} />
      </div>

      {/* second row */}
      <div className="flex space-x-2">
        <HeaderInfo title="Model URL" value={modelUrl} />

        <HeaderInfo title="Tags" value={importingHuggingFaceRepoData.tags} />
      </div>
    </div>
  )
}

type HeaderInfoProps = {
  title: string
  value: string | string[]
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ title, value }) => (
  <div className="flex flex-1 flex-col space-y-2">
    <h1 className="text-sm font-semibold">{title}</h1>
    {typeof value === 'string' ? (
      <span>{value}</span>
    ) : (
      <div className="mt-2 flex flex-wrap gap-x-1 gap-y-1">
        {value.map((v) => (
          <Badge key={v} themes="primary" className="line-clamp-1" title={v}>
            {v}
          </Badge>
        ))}
      </div>
    )}
  </div>
)

export default React.memo(ModelSegmentInfo)
