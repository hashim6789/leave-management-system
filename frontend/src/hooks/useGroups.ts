import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  createGroupService,
  updateGroupService,
  deleteGroupService,
} from "@/services";
import {
  setGroups,
  clearEditing,
  startEditing,
  deleteGroup,
} from "@/store/slices/groupManagementSlice";
import type { Group } from "@/types";

export const useGroups = () => {
  const dispatch = useAppDispatch();
  const { groups, editingGroup } = useAppSelector().groups;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreateModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(true);
  };

  const openEditModal = (group: Group) => {
    dispatch(startEditing(group));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(false);
  };

  const addGroup = async (data: Omit<Group, "_id">) => {
    setLoading(true);
    try {
      const { data: newGroup } = await createGroupService(data);
      dispatch(setGroups([...groups, newGroup]));
      closeModal();
    } catch (error) {
      console.error(error);
      setError("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const updateGroup = async (data: Partial<Group> & { _id: string }) => {
    setLoading(true);
    try {
      const { data: updatedGroup } = await updateGroupService(data._id, data);
      dispatch(
        setGroups(
          groups.map((group) =>
            group._id === updatedGroup._id ? updatedGroup : group
          )
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
      setError("Failed to update group");
    } finally {
      setLoading(false);
    }
  };

  const removeGroup = async (id: string) => {
    setLoading(true);
    try {
      await deleteGroupService(id);
      dispatch(deleteGroup(id));
    } catch (error) {
      console.error(error);
      setError("Failed to delete group");
    } finally {
      setLoading(false);
    }
  };

  return {
    groups,
    editingGroup,
    isModalOpen,
    loading,
    error,
    openCreateModal,
    openEditModal,
    closeModal,
    addGroup,
    updateGroup,
    removeGroup,
  };
};
