/**
 * @module Minimize
 */

import { Visibility } from "./minimize.meta.js";

/**
 * @category Validation
 */
export class Validate {
  /**
   * Validates that the value is a member of the `Visibility` enum.
   * @category Validation
   */
  public static visibility = (value: unknown) => {
    return value as Visibility;
  };
}
