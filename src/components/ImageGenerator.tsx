import React from "react"
import { useState } from "react"
import MonsterApiClient from "monsterapi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ImageIcon, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const monsterApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNhOWVjODlkN2NjNWZlNmFhODQ3Nzk2NzAxYWQ2M2ExIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDEtMjBUMTM6MTE6MzcuODk3MjExIn0.2dDR4EeGgHlwwK4DesH1JXqhbQS8aiDp4-SSYD0qguk"

  const handleGenerateImage = async (prompt: string) => {
    setIsLoading(true)
    const model = "txt2img"
    const input = { prompt: prompt.replace("generate", "").trim() }
    const monsterClient = new MonsterApiClient(monsterApiKey)

    try {
      const response = await monsterClient.generate(model, input)

      if (response.output && response.output.length > 0) {
        const imageUrl = response.output[0]
        setGeneratedImage(imageUrl)
        toast.success("Image generated successfully!")
      } else {
        console.error("Image generation failed:", response)
        toast.error("Failed to generate image. Please try again.")
      }
    } catch (error) {
      console.error("Error generating image:", error)
      toast.error("An error occurred while generating the image.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt) {
      handleGenerateImage(prompt)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-md mx-auto bg-black/30 text-white backdrop-blur-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Artify
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Describe your imagination..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/50 border-none rounded-full pr-12"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {generatedImage && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={generatedImage}
              alt="Generated"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          )}
          {!generatedImage && (
            <p className="text-white/70 text-center mt-4">
              Your generated image will appear here. Let your imagination run wild!
            </p>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ImageGenerator

