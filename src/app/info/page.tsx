import Title from "@/components/Title";
import React from "react";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center m-2">
      <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-lg p-6 my-12 space-y-4">
        <Title text="About" icon={""} />

        <div className="p-5 border border-gray-600 rounded-md w-full flex-col flex items-center justify-center">
          <div className="max-w-2xl mx-auto divide-y divide-gray-500 ">
            <Info
              title="How does it work?"
              body={
                "It works by simulating the process of making a set number of pulls multiple times (as specified by the number of simulations). It then calculates the percentage of successful simulations (where you obtained the desired number of copies) by dividing the number of successful simulations by the total number of simulations, thats why the results vary a bit each time you calculate the probability."
              }
            />
            <Info
              title="Will you add more gatcha games?"
              body={
                "Yes, I'm also planning on adding a custom calculator that allows you to adjust all the odds in the gacha system and run simulations based on those specific settings."
              }
            />

            <Info
              title="What if I find a bug or incorrect result?"
              body={
                "If you encounter a bug or incorrect results, please create a GitHub issue. This will help me investigate the problem and determine the best solution."
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ title, body }: { title: string; body: String }) {
  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <div className="flex gap-x-5">
        <div className="grow">
          <h3 className="md:text-lg font-semibold text-gray-400 ">{title}</h3>
          <p className="mt-1 text-gray-500 ">{body}</p>
        </div>
      </div>
    </div>
  );
}
