"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 animate-pulse select-none">
            404
          </h1>
          <div className="absolute inset-0 text-9xl font-bold text-cyan-500/20 blur-sm select-none">
            404
          </div>
        </div>

        {/* Error Message Card */}
        <Card className="bg-black/20 border-cyan-500/30 backdrop-blur-sm">
          <CardContent className="">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white transition-all duration-500">
                Page not found
              </h2>
              <p className="text-cyan-200">
                The page you&apos;re looking for seems to have been consumed by
                the gacha system.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2 cursor-pointer"
          >
            Back to Calculator
          </Button>
        </div>
      </div>
    </div>
  );
}
