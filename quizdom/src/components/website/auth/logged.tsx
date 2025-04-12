import React from "react";

// CONTEXT
import { ContextType } from "@/context/auth/context";
import { useAuthContext } from "@/context/auth/state";

export default function Logged() {
  const { team }: ContextType = useAuthContext();

  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center items-center">
            <div className="lg:w-3/3 lg:mb-0 mb-6 p-4">
              <div className="lg:w-3/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center">
                  <h2 className="text-white font-bold title-font tracking-wider text-lg">
                    TEAM DETAILS
                  </h2>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                  <br />


                  <p className="text-gray-500">
                    <b>TEAM ID</b> : {team?.id}
                  </p>
                  <p className="text-gray-500">
                    <b>TEAM NAME</b> : {team?.team}
                  </p>

                  <ul>
                    <p className="text-gray-500">
                      <b>Members:</b>
                    </p>{" "}
                    <li>
                      <p className="text-gray-500">
                        <b><i>Name:</i></b> {team.member?.member1.name} <b><i>Class:</i></b>{" "}
                        {team.member?.member1.class}{" "}
                      </p>
                    </li>
                    <li>
                      <p className="text-gray-500">
                        <b><i>Name:</i></b> {team.member?.member2.name} <b><i>Class:</i></b>{" "}
                        {team.member?.member2.class}{" "}
                      </p>
                    </li>
                    <li>
                      <p className="text-gray-500">
                        <b><i>Name:</i></b> {team.member?.member3.name} <b><i>Class:</i></b>{" "}
                        {team.member?.member3.class}{" "}
                      </p>
                    </li>
                    <li>
                      <p className="text-gray-500">
                        <b><i>Name:</i></b> {team.member?.member4.name} <b><i>Class:</i></b>{" "}
                        {team.member?.member4.class}{" "}
                      </p>
                    </li>
                  </ul>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                  <h2 className="text-white font-medium title-font tracking-wider text-sm">
                    {team?.school}
                  </h2>
                  <p className="text-gray-500"><b><i>CATEGORY: </i></b> {team?.category}</p><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
