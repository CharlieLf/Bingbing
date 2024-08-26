export default class TypeUtils {
    static byteArrayToImageURL(value: number[] | Uint8Array): string {
        const byteArray = new Uint8Array(value);
        const blob = new Blob([byteArray], { type: "image/png" });
        return URL.createObjectURL(blob);
    }
    static blobToUint8Array = (blob: Blob): Promise<Uint8Array> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                resolve(new Uint8Array(arrayBuffer));
            };

            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    };
}