import { ImageFormat, ImageSize } from "../helpers/members/avatarUrl.js";
/** Pause the execution for a given amount of milliseconds. */
export declare function delay(ms: number): Promise<void>;
/** Help format an image url. */
export declare function formatImageURL(url: string, size?: ImageSize, format?: ImageFormat): string;
/** TS save way to check if a property exists in an object */
export declare function hasProperty<T extends {}, Y extends PropertyKey = string>(obj: T, prop: Y): obj is T & Record<Y, unknown>;
