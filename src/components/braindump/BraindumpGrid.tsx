"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BraindumpCard } from "./BraindumpCard";

// Braindump items - my creative projects and experiments
const braindumpItems = [
  {
    id: 1,
    title: "FocusMode",
    description: "A productivity app designed specifically for ADHD/ADD brains. Features dopamine-driven micro-tasks, adaptive focus sessions, and neural reward systems that actually work for neurodivergent minds.",
    category: "Project",
    status: "Live",
    tags: ["React", "TypeScript", "Productivity", "ADHD", "PWA"],
    emoji: "🎯",
    color: "from-blue-500/20 to-purple-500/20",
    date: "2024-08-01",
    thumbnail: "/images/projects/focusmode-thumbnail.svg", // Replace with actual screenshot when uploaded
    liveUrl: "https://focusmode.fatmaali.dev",
    githubUrl: "https://github.com/fatmali/focusmode"
  },
  {
    id: 2,
    title: "Chatbot Cowgirl",
    description: "An AI-generated country song about technology and the modern world. Created using AI music generation tools and showcased on LinkedIn.",
    category: "Music",
    status: "Completed",
    tags: ["AI", "Music", "Country", "Creative"],
    emoji: "🤠",
    color: "from-orange-500/20 to-yellow-500/20",
    date: "2024-07-25",
    liveUrl: "https://www.linkedin.com/posts/fatma-ali-dev", // Update with actual LinkedIn post URL
  }
];

const categories = ["All", "Project", "Music"];
const statuses = ["All", "Live", "Completed"];

export function BraindumpGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredItems = braindumpItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background border border-border hover:border-primary/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Status:</h3>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background border border-border hover:border-primary/50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {braindumpItems.length} items
          </span>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item, index) => (
          <BraindumpCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-xl font-medium mb-2">No matches found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more creative chaos!
          </p>
        </motion.div>
      )}
    </div>
  );
}
