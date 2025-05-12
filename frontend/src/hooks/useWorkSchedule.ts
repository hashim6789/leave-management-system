import type { WorkSchedule } from "@/types";
import {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  startEditing,
  openCreateModal,
  closeModal,
} from "@/store/slices/workScheduleManagementSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  createScheduleService,
  updateScheduleService,
  deleteScheduleService,
} from "@/services";

export const useSchedules = () => {
  const dispatch = useAppDispatch();
  const { schedules, editingSchedule, isModalOpen } =
    useAppSelector().workSchedule;

  const handleAddSchedule = async (schedule: WorkSchedule) => {
    try {
      const { data } = await createScheduleService({ ...schedule });
      dispatch(addSchedule(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSchedule = async (updatedSchedule: WorkSchedule) => {
    try {
      const { data } = await updateScheduleService(updatedSchedule.name, {
        ...updatedSchedule,
      });
      dispatch(updateSchedule(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSchedule = async (name: string) => {
    try {
      await deleteScheduleService(name);
      dispatch(deleteSchedule(name));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEditing = (schedule: WorkSchedule) => {
    dispatch(startEditing(schedule));
  };

  const handleOpenCreateModal = () => {
    dispatch(openCreateModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    schedules,
    editingSchedule,
    isModalOpen,
    addSchedule: handleAddSchedule,
    updateSchedule: handleUpdateSchedule,
    deleteSchedule: handleDeleteSchedule,
    startEditing: handleStartEditing,
    openCreateModal: handleOpenCreateModal,
    closeModal: handleCloseModal,
  };
};
