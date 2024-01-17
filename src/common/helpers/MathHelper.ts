export class MathHelper {
  static getRandomInterval(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
