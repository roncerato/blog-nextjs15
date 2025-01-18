import { auth0 } from "@/lib/auth0"
import Image from "next/image"

export default async function Home() {
  const session = await auth0.getSession()

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
        {JSON.stringify(session)}
      </main>
    )
  }

  return (
    <main>
      <Image
        src={session.user.picture!}
        alt={session.user.name!}
        width={50}
        height={50} />
      <h1>{session.user.email}</h1>
      <a href="/auth/logout">Log out</a>
      <pre>
        {JSON.stringify(session)}
      </pre>
    </main>
  )
}