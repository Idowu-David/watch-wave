


export default function Home() {
  const sections = ["Trending Now", "Popular Movies", "Top Series"];
  const sidebarItems = ["Home", "Trending", "Movies", "Series", "My List"];

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr] grid-rows-[auto_1fr] gap-4 p-4 bg-neutral-950 text-white">

      {/* NAVBAR */}
      <nav className="col-span-1 md:col-span-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-neutral-950 to-neutral-900 px-4 py-3 sm:px-6">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-red-600">
          WATCH-WAVE
        </h1>

        <div className="hidden sm:flex gap-3">
          {["Login", "Sign Up", "About"].map(btn => (
            <button
              key={btn}
              className="rounded-full bg-neutral-800 px-5 py-2 text-sm transition hover:bg-red-600"
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800">
            ☾
          </div>
          <div className="hidden sm:block text-xs text-neutral-400 text-center">
            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800">
              UN
            </div>
            Username
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside className="hidden md:block rounded-xl bg-neutral-900 p-4 space-y-2">
        {sidebarItems.map(item => (
          <div
            key={item}
            className="cursor-pointer rounded-lg px-4 py-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
          >
            {item}
          </div>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="space-y-10 overflow-y-auto">

        {sections.map(section => (
          <section key={section}>
            <h2 className="mb-3 border-l-4 border-red-600 pl-3 text-lg font-semibold">
              {section}
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative h-[260px] w-[170px] sm:h-[300px] sm:w-[200px] flex-shrink-0 rounded-xl bg-neutral-800 transition hover:scale-105 hover:shadow-2xl"
                >
                  {/* PLAY OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                    <div className="flex items-center justify-center rounded-full bg-red-600/90 p-3 shadow-lg transition hover:bg-red-500">
                      <svg
                        viewBox="0 0 640 640"
                        className="h-12 w-12 text-white"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM276.5 211.5C269.1 207 259.8 206.8 252.2 211C244.6 215.2 240 223.3 240 232L240 408C240 416.7 244.7 424.7 252.3 428.9C259.9 433.1 269.1 433 276.6 428.4L420.6 340.4C427.7 336 432.1 328.3 432.1 319.9C432.1 311.5 427.7 303.8 420.6 299.4L276.6 211.4zM362 320L288 365.2L288 274.8L362 320z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

      </main>
    </div>
  );
}
