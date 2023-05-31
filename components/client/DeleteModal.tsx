"use client";

import { store } from "@/zustand/store";
import CustomButton from "./CustomButton";
import Spacer from "../helpers/Spacer";
import { BsTrash2Fill } from "react-icons/bs";
import { useFetchNextApi } from "@/hooks/useFetchNextApi";

export default function DeleteModal() {
  const { deleteModal, setDeleteModal } = store();
  const { data, error, execute, loading } = useFetchNextApi(
    "/api/delete/delete-comment-or-post",
    { method: "DELETE", headers: { "Content-type": "application/json" } }
  );

  return (
    deleteModal.toggle && (
      <div className="absolute top-0 right-0 left-0 bottom-0 m-auto h-screen w-screen bg-slate-700/50 z-10 flex justify-center items-center">
        <div className="w-full h-full md:w-1/2 md:h-1/2 bg-white flex flex-col justify-center items-center filter">
          <p>{deleteModal.text}</p>
          <div className="flex my-3">
            <button
              className="text-sm"
              onClick={() => {
                setDeleteModal({
                  toggle: false,
                  id: undefined,
                  text: undefined,
                });
              }}
            >
              No thanks
            </button>
            <Spacer margin="mx-3" />
            <CustomButton
              text="Yes, delete it"
              addedIcon={<BsTrash2Fill color="white" />}
              handleClick={() => {
                //todo: Delete the post with execute!
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}
