import CreateChat from "@/components/chatGroup/CreateChat";
import DashNav from "@/components/chatGroup/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />

      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={session?.user!} />
        </div>
      </div>
    </>
  );
}
