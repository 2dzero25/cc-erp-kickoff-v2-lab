import type { CustomerGrade } from "@/core/domain/entities/Customer";

const DISCOUNT_RATE_BY_GRADE: Record<CustomerGrade, number> = {
  NORMAL: 0,
  SILVER: 0.05,
  GOLD: 0.1,
};

/**
 * Apply a customer-grade discount to an original amount.
 *
 * 할인액(originalAmount × rate)을 Math.round 로 반올림한 뒤 원금에서 차감한다.
 * 최종 금액이 아닌 할인액 자체를 반올림하는 점에 유의.
 */
export class DiscountPolicy {
  static apply(originalAmount: number, grade: CustomerGrade): number {
    if (originalAmount < 0) {
      throw new Error(`originalAmount must be non-negative: ${originalAmount}`);
    }

    const rate = DISCOUNT_RATE_BY_GRADE[grade];
    const discount = Math.round(originalAmount * rate);
    return originalAmount - discount;
  }
}
