import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createGroupService, updateGroupService } from "@/services";
import { setGroups, clearEditing } from "@/store/slices/groupSlice";
import type { Group } from "@/types";

export const useGroups = () => {
  const dispatch = useAppDispatch();
  const { groups, editingGroup } = useAppSelector().groups;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearEditing());
    setIsModalOpen(false);
  };

  const addGroup = async (data: Omit<Group, "_id">) => {
    try {
      const { data: newGroup } = await createGroupService(data);
      dispatch(setGroups([...groups, newGroup]));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updateGroup = async (data: Partial<Omit<Group, "_id">>) => {
    if (!editingGroup) return;
    try {
      const { data: updatedGroup } = await updateGroupService(
        editingGroup._id as string,
        data
      );
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
    }
  };

  return {
    addGroup,
    updateGroup,
    editingGroup,
    isModalOpen,
    openCreateModal,
    closeModal,
  };
};
