import { useState } from "react";
import { Music, Play, Pause, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export const MusicGenApp = () => {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    if (!prompt || !mode) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setHasGenerated(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="gradient-primary p-2 rounded-xl shadow-soft">
            <Music className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">MusicGen</h1>
        </div>
        <div className="text-sm text-muted-foreground">AI Music Generator</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          {/* Generation Card */}
          <Card className="p-8 shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Create Your Music</h2>
                <p className="text-muted-foreground">
                  Describe the music you want to generate and let AI compose it for you
                </p>
              </div>

              <div className="space-y-4">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Music Prompt
                  </label>
                  <Textarea
                    placeholder="e.g., a calm piano piece in C major, epic orchestral battle music, ambient electronic soundscape..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] resize-none bg-accent/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>

                {/* Mode Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Generation Mode
                  </label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="bg-accent/50 border-border/50 focus:border-primary transition-colors">
                      <SelectValue placeholder="Choose generation mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/50">
                      <SelectItem value="piano" className="focus:bg-accent">
                        🎹 Piano Solo
                      </SelectItem>
                      <SelectItem value="ensemble" className="focus:bg-accent">
                        🎻 Multi-instrument Ensemble
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt || !mode || isGenerating}
                  variant="hero"
                  size="lg"
                  className="w-full mt-6"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Music className="mr-2 h-5 w-5" />
                      Generate Music
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Progress */}
          {isGenerating && (
            <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-sm animate-float">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">Generating your music...</span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  This usually takes 30-60 seconds
                </p>
              </div>
            </Card>
          )}

          {/* Audio Player */}
          {hasGenerated && !isGenerating && (
            <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-sm animate-fade-in">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">Your Generated Music</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prompt}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={togglePlayback}
                    variant="secondary"
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-soft hover:shadow-glow transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </Button>

                  <div className="flex-1 space-y-2">
                    <div className="h-1 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0:45</span>
                      <span>2:30</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 shadow-soft hover:shadow-glow transition-all duration-300"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by AI • Create unlimited music compositions
        </p>
      </footer>
    </div>
  );
};