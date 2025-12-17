'use client';

import Link from "next/link";
import { getImage } from "@/lib/tmdb";

type Props = {
  item: any;
};

export default function ResultCard({ item }: Props) {
  const title = item.title || item.name;

  return (
    <Link
      href={`/item/${item.media_type}/${item.id}`}
      className="block hover:scale-105 transition"
    >
      <img
        src={getImage(item.poster_path)}
        alt={title}
        className="rounded-lg"
      />
      <p className="mt-2 text-sm text-center text-white">{title}</p>
    </Link>
  );
}