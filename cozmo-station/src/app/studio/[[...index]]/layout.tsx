export const metadata = {
  title: 'Sanity Studio',
  description: 'Manage content for Cozmo Station',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh' }}>
      {children}
    </div>
  )
}
