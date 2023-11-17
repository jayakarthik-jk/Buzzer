import { v4 as uuid } from "uuid";

export type User = {
  id: string;
  name: string;
  listener: Listener;
};
export type GroupInfo = {
  id: string;
  users: User[];
  endTime: number;
  buzzerSleepTime: number;
  selectedUser: User | null;
};
export type Listener = (selectedUser: string | null) => void;

const groups: Record<string, GroupInfo | undefined> = {};

export const createUser = (name: string, listener: Listener): User => {
  return { id: uuid(), name, listener };
};

export const getGroupById = (groupId: string): GroupInfo | undefined =>
  groups[groupId];

export const groupDurationsInMinute = [15, 30, 60];
export const buzzerSleepTimesInSecond = [15, 30, 60];
export type GroupDurationsInMinute = (typeof groupDurationsInMinute)[number];
export type BuzzerSleepTimesInSecond =
  (typeof buzzerSleepTimesInSecond)[number];
export interface CreateGroupParams {
  groupDurationInMinute?: GroupDurationsInMinute;
  buzzerSleepTimeInSecond?: BuzzerSleepTimesInSecond;
}
export const createGroup = ({
  groupDurationInMinute: duration = 30,
  buzzerSleepTimeInSecond: sleep = 30,
}: CreateGroupParams = {}): GroupInfo => {
  const groupId = uuid();

  const group = {
    id: groupId,
    users: [],
    endTime: Date.now() + duration * 60 * 1000,
    buzzerSleepTime: sleep * 1000,
    selectedUser: null,
  };
  groups[groupId] = group;
  // delete the group after the duration
  setTimeout(() => delete groups[groupId], duration * 60 * 1000);

  return group;
};

export interface JoinGroupParams {
  groupId: string;
  user: User;
}
export const joinGroup = ({ groupId, user }: JoinGroupParams) => {
  const group = groups[groupId];
  if (!group) {
    return "Group not found" as const;
  }
  group.users.push(user);
  return group;
};

export const selectUser = ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  const group = groups[groupId];
  if (!group) {
    return "Group not found" as const;
  }

  const user = group.users.find((user) => user.id === userId);
  if (!user) {
    return "User not found" as const;
  }

  if (group.selectedUser) {
    return "User already selected" as const;
  }
  group.selectedUser = user;
  // notify all listeners
  group.users.forEach((user) => user.listener(userId));
  // set the selected user to null after the buzzer sleep time
  setTimeout(() => {
    group.selectedUser = null;
    group.users.forEach((user) => user.listener(null));
  }, group.buzzerSleepTime);

  return group;
};
