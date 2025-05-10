import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createUserService, updateUserService } from "@/services";
import { setUsers, clearEditing } from "@/store/slices/userSlice";
import type { User } from "@/types";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, editingUser } = useAppSelector().users;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(false);
  };

  const addUser = async (data: Omit<User, "_id" | "isBlocked">) => {
    try {
      const { data: newUser } = await createUserService(data);
      dispatch(setUsers([...users, newUser]));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (data: Partial<Omit<User, "_id">>) => {
    if (!editingUser) return;
    try {
      const { data: updatedUser } = await updateUserService(
        editingUser._id,
        data
      );
      dispatch(
        setUsers(
          users.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addUser,
    updateUser,
    editingUser,
    isModalOpen,
    openCreateModal,
    closeModal,
  };
};
