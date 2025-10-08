import ProfileForm from "@/components/profile-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ProfileForm />
      </div>
    </main>
  )
}
