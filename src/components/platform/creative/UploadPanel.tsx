"use client";

import { useRef } from "react";
import { Upload, Video, ImageIcon, Wand2 } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { formatRelativeTime } from "@/lib/platform/format";
import type { ContentStatus } from "@/lib/platform/types";

const STATUS_LABEL: Record<ContentStatus, string> = {
  uploaded: "Uploaded",
  editing: "Atheo is editing…",
  ready: "Ready to post",
};

export function UploadPanel({ onRequestCaptions }: { onRequestCaptions: (contentId: string) => void }) {
  const { state, addContent, updateContentStatus, notify } = usePlatform();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    const kind = file.type.startsWith("video") ? "video" : "image";
    const previewUrl = URL.createObjectURL(file);
    const id = addContent({ kind, title: file.name, previewUrl });

    setTimeout(() => updateContentStatus(id, "editing"), 2500);
    setTimeout(() => {
      updateContentStatus(id, "ready");
      notify({
        type: "system",
        title: "Your edit is ready",
        body: `"${file.name}" has been edited by Atheo and is ready to post.`,
      });
    }, 7500);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-atheo-line bg-atheo-blush/30 px-6 py-10 text-center transition-colors hover:border-atheo-coral"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-atheo-white text-atheo-coral">
          <Upload className="h-5 w-5" />
        </span>
        <span className="font-display text-sm font-semibold text-atheo-aubergine">
          Upload a video or image
        </span>
        <span className="text-xs text-atheo-aubergine-mute">
          Atheo will edit it for you — drop it here and we&apos;ll handle the rest.
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*,image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.content.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-atheo-line bg-atheo-white">
            <div className="flex aspect-video items-center justify-center bg-atheo-blush/50 text-atheo-coral">
              {item.previewUrl ? (
                item.kind === "video" ? (
                  <video src={item.previewUrl} className="h-full w-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.previewUrl} alt={item.title} className="h-full w-full object-cover" />
                )
              ) : item.kind === "video" ? (
                <Video className="h-7 w-7" />
              ) : (
                <ImageIcon className="h-7 w-7" />
              )}
            </div>
            <div className="p-4">
              <p className="truncate font-display text-sm font-semibold text-atheo-aubergine">{item.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-atheo-aubergine-mute">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.status === "ready"
                      ? "bg-atheo-coral"
                      : item.status === "editing"
                        ? "animate-pulse bg-atheo-apricot"
                        : "bg-atheo-line"
                  }`}
                />
                {STATUS_LABEL[item.status]} · {formatRelativeTime(item.createdAt)}
              </p>
              {item.status === "ready" && (
                <button
                  type="button"
                  onClick={() => onRequestCaptions(item.id)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-atheo-coral hover:text-atheo-aubergine"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  Suggest captions
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
