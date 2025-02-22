

export default async function SharedPost({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params

  return (
    <>
      {postId}
    </>
  );
}