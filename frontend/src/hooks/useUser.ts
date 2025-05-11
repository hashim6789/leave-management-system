import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createUserService, updateUserService } from "@/services";
import { getGroupsService } from "@/services";
import { setUsers, clearEditing, startEditing } from "@/store/slices/userSlice";
import type { User, Group } from "@/types";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, editingUser } = useAppSelector().users;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch groups for dropdown
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const { data } = await getGroupsService({ limit: 100 }); // Fetch all groups
        setGroups(data.data);
      } catch (err) {
        setError("Failed to fetch groups");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const openCreateModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    dispatch(startEditing(user));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(false);
  };

  const addUser = async (
    data: Omit<User, "_id" | "isBlocked"> & { groupId?: string }
  ) => {
    setLoading(true);
    try {
      const { data: newUser } = await createUserService(data);
      dispatch(setUsers([...users, newUser]));
      closeModal();
    } catch (error) {
      console.error(error);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    data: Partial<Omit<User, "_id">> & { groupId?: string }
  ) => {
    if (!editingUser) return;
    setLoading(true);
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
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    editingUser,
    groups,
    isModalOpen,
    loading,
    error,
    openCreateModal,
    openEditModal,
    closeModal,
    addUser,
    updateUser,
  };
};
