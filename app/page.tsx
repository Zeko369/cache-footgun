import { unstable_cacheTag, revalidateTag } from "next/cache";

const db = {};

const getUser = async (id: string) => {
  "use cache";

  if (!db[id]) {
    return null;
  }

  unstable_cacheTag(`user-${id}`);

  return db[id];
};

export default async function Home({ searchParams }) {
  const res = await searchParams;
  const user = await getUser(res.id);

  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>

      <form
        action={async () => {
          "use server";

          db[res.id] = { name: "John Doe" };
          revalidateTag(`user-${res.id}`);
        }}
      >
        <button type="submit">Add</button>
      </form>

      <hr />

      <code style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
        {JSON.stringify(db, null, 2)}
      </code>
    </div>
  );
}
