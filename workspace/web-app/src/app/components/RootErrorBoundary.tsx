import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertCircle, Home, ArrowLeft, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export function RootErrorBoundary() {
  const error = useRouteError();

  let title = "Unexpected Error";
  let message = "Something went wrong. Please try again later.";
  let code = "500";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you're looking for doesn't exist or has been moved.";
      code = "404";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You don't have permission to access this page.";
      code = "401";
    } else if (error.status === 503) {
      title = "Service Unavailable";
      message = "Looks like our API is down.";
      code = "503";
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-none bg-transparent text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#5A5FF2]/5 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-[#5A5FF2]/40" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-full border-2 border-dashed border-[#5A5FF2]/10"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Error {code}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="text-muted-foreground text-[13px] leading-relaxed max-w-[320px] mx-auto font-medium">
              {message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()} 
              className="h-10 px-6 text-xs gap-2 border-border/60 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back
            </Button>
            <Button 
              asChild 
              className="h-10 px-8 text-xs gap-2 bg-[#5A5FF2] hover:bg-[#5A5FF2]/90 text-white font-bold shadow-md shadow-[#5A5FF2]/20"
            >
              <Link to="/">
                <Home className="w-3.5 h-3.5" />
                Return Home
              </Link>
            </Button>
          </div>

          <div className="pt-8 flex flex-col items-center">
            <button 
              onClick={() => window.location.reload()}
              className="text-[11px] text-muted-foreground/60 hover:text-[#5A5FF2] transition-colors flex items-center gap-1.5 font-medium"
            >
              <RefreshCcw className="w-3 h-3" />
              Try refreshing the page
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
