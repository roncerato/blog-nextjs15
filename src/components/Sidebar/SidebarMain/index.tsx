import { ISidebarMainProps } from "./SidebarMain.props";

export default function SidebarMain({ posts }: ISidebarMainProps) {

    return (
        <main className="px-2 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800 scrollbar-custom">
            {posts.map(post => (
                <a
                    className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm`}
                    key={String(post._id)}
                    href={`/post/${post._id}`}>
                    {post.topic}
                </a>
            ))}
        </main>
    )
}

