"use client"

import * as React from "react"
import { Home, Search, Users, User, Menu } from "lucide-react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"

const items = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Search",
    url: "/search",
    icon: Search,
  },
  {
    name: "Communities",
    url: "/community",
    icon: Users,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    name: "More",
    url: "#more",
    icon: Menu,
  },
]

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={items} defaultActive="Home" />
}

