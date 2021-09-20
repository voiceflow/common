/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
export type Nullable<T> = T | null;
export type Nullish<T> = Nullable<T> | undefined;

export type Function<A extends any[] = any[], R = any> = (...args: A) => R;

export type AnyFunction = Function<any[], any>;

export type Callback = Function<[], Eventual<void>>;

export type Eventual<T> = Promise<T> | T;

export type StringifyEnum<T extends string> = T | `${T}`;

export type NormalizedValue<T> = T extends Normalized<infer R> ? R : never;

export interface Normalized<T> {
  byKey: Record<string, T>;
  allKeys: string[];
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type NullableRecord<T extends object> = { [K in keyof T]: Nullable<T[K]> };

export type NonNullishRecord<T extends object> = Required<{ [K in keyof T]: Exclude<T[K], null> }>;

export type Struct = Record<string, unknown>;
