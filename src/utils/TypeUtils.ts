export default class TypeUtils {
    static byteArrayToImageURL(value: number[] | Uint8Array): string {
        const byteArray = new Uint8Array(value);
        const blob = new Blob([byteArray], { type: "image/png" });
        return URL.createObjectURL(blob);
    }
}