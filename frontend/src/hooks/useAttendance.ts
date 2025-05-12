import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import type { Attendance, Group, User, WorkSchedule } from "@/types";
import {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  checkInStart,
  checkInSuccess,
  checkInFailure,
  checkOutStart,
  checkOutSuccess,
  checkOutFailure,
  editCheckInStart,
  editCheckInSuccess,
  editCheckInFailure,
  editCheckOutStart,
  editCheckOutSuccess,
  editCheckOutFailure,
} from "@/store/slices/attendanceSlice";
import {
  fetchGroupStart,
  fetchGroupSuccess,
  fetchGroupFailure,
} from "@/store/slices/groupSlice";
import {
  fetchWorkScheduleStart,
  fetchWorkScheduleSuccess,
  fetchWorkScheduleFailure,
} from "@/store/slices/workScheduleSlice";
import {
  attendanceService,
  fetchGroupByIdService,
  fetchWorkScheduleByIdService,
} from "@/services";

interface UseAttendance {
  user: User | null;
  workSchedule: WorkSchedule | null;
  group: Group | null;
  groupLoading: boolean;
  currentAttendance: Attendance | null;
  isCheckedIn: boolean;
  loading: boolean;
  error: string | null;
  checkIn: () => Promise<void>;
  checkOut: () => Promise<void>;
  editCheckIn: (newTime: string) => Promise<void>;
  editCheckOut: (newTime: string) => Promise<void>;
}

export const useAttendance = (): UseAttendance => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector().auth;
  const { currentAttendance, isCheckedIn, loading, error } =
    useAppSelector().attendance;
  const {
    group,
    loading: groupLoading,
    error: groupError,
  } = useAppSelector().group;
  const {
    workSchedule,
    loading: workScheduleLoading,
    error: workScheduleError,
  } = useAppSelector().workSchedule;

  // Ref flags to prevent multiple API calls
  const groupFetched = useRef(false);
  const workScheduleFetched = useRef(false);
  const attendanceFetched = useRef(false);

  // Fetch Group
  useEffect(() => {
    if (group || !user?.group || groupFetched.current) return;
    groupFetched.current = true;

    const fetchGroup = async () => {
      dispatch(fetchGroupStart());
      try {
        const { data } = await fetchGroupByIdService(user.group as string);
        dispatch(fetchGroupSuccess(data));
      } catch (err: any) {
        dispatch(fetchGroupFailure(err.message));
      }
    };

    fetchGroup();
  }, [dispatch, user?.group, group]);

  // Fetch Work Schedule
  useEffect(() => {
    if (!group?.workSchedule || workSchedule || workScheduleFetched.current)
      return;
    workScheduleFetched.current = true;

    const fetchWorkSchedule = async () => {
      dispatch(fetchWorkScheduleStart());
      try {
        const { data } = await fetchWorkScheduleByIdService(group.workSchedule);
        dispatch(fetchWorkScheduleSuccess(data));
      } catch (err: any) {
        dispatch(fetchWorkScheduleFailure(err.message));
      }
    };

    fetchWorkSchedule();
  }, [dispatch, group?.workSchedule, workSchedule]);

  // Fetch Attendance
  useEffect(() => {
    if (!user?._id || attendanceFetched.current) return;
    attendanceFetched.current = true;

    const fetchAttendance = async () => {
      dispatch(fetchAttendanceStart());
      try {
        const { data } = await attendanceService.fetchAttendance(user._id);
        dispatch(fetchAttendanceSuccess(data));
      } catch (err: any) {
        dispatch(fetchAttendanceFailure(err.message));
      }
    };

    fetchAttendance();
  }, [dispatch, user?._id]);

  const handleCheckIn = async () => {
    if (!user || !user.group) {
      dispatch(checkInFailure("User or group not found"));
      return;
    }

    dispatch(checkInStart());
    try {
      if (!user || !group || !workSchedule) return;
      const { data, status } = await attendanceService.checkIn(
        user,
        group,
        workSchedule,
        new Date().getDay()
      );
      if (status === 200) {
        dispatch(checkInSuccess(data));
      }
    } catch (err: any) {
      dispatch(checkInFailure(err.message));
    }
  };

  const handleCheckOut = async () => {
    if (!currentAttendance?._id) {
      dispatch(checkOutFailure("No active check-in found"));
      return;
    }

    dispatch(checkOutStart());
    try {
      const { data } = await attendanceService.checkOut(currentAttendance._id);
      dispatch(checkOutSuccess(data));
    } catch (err: any) {
      dispatch(checkOutFailure(err.message));
    }
  };

  const handleEditCheckIn = async (newTime: string) => {
    if (!currentAttendance?._id || !user?.group) {
      dispatch(editCheckInFailure("No active attendance or group not found"));
      return;
    }

    dispatch(editCheckInStart());
    try {
      const { data } = await attendanceService.editCheckIn(
        currentAttendance._id,
        newTime,
        workSchedule?.requiresApproval || false
      );
      dispatch(editCheckInSuccess(data));
    } catch (err: any) {
      dispatch(editCheckInFailure(err.message));
    }
  };

  const handleEditCheckOut = async (newTime: string) => {
    if (!currentAttendance?._id || !currentAttendance.checkOutTime) {
      dispatch(editCheckOutFailure("No check-out time found to edit"));
      return;
    }

    dispatch(editCheckOutStart());
    try {
      const { data } = await attendanceService.editCheckOut(
        currentAttendance._id,
        newTime,
        workSchedule?.requiresApproval || false
      );
      dispatch(editCheckOutSuccess(data));
    } catch (err: any) {
      dispatch(editCheckOutFailure(err.message));
    }
  };

  return {
    user,
    group: group || null,
    workSchedule,
    groupLoading: groupLoading || workScheduleLoading,
    currentAttendance,
    isCheckedIn,
    loading: loading || groupLoading || workScheduleLoading,
    error: error || groupError || workScheduleError,
    checkIn: handleCheckIn,
    checkOut: handleCheckOut,
    editCheckIn: handleEditCheckIn,
    editCheckOut: handleEditCheckOut,
  };
};
