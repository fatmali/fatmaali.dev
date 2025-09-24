"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface BraindumpItem {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  tags: string[];
  emoji: string;
  color: string;
  date: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface BraindumpCardProps {
  item: BraindumpItem;
  index: number;
}

export function BraindumpCard({ item, index }: BraindumpCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Research": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Idea": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Ongoing": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Live": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
        {/* Thumbnail */}
        {item.thumbnail && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            
            {/* Links overlay */}
            {(item.liveUrl || item.githubUrl) && (
              <div className="absolute top-4 right-4 flex gap-2">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
              <span className="text-xs text-muted-foreground font-terminal">
                {formatDate(item.date)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {item.category}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
