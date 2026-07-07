import { useState } from "react";
import { FiDownload, FiLoader, FiPackage } from "react-icons/fi";
import MagneticButton from "../ui/MagneticButton";
import { CERTIFICATES } from "../../data/site";

export default function DownloadDocuments() {
  const [zipping, setZipping] = useState(false);

  const downloadAll = async () => {
    setZipping(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      await Promise.all(
        CERTIFICATES.map(async (cert) => {
          const response = await fetch(cert.file);
          const blob = await response.blob();
          zip.file(cert.fileName, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "SKC-Construction-Company-Documents.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-8 text-center sm:p-12">
      <p className="eyebrow mb-4">Full Transparency</p>
      <h2 className="font-display text-3xl font-semibold md:text-4xl">
        Download Company Documents
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
        Every certificate is available for you to verify and keep on record.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {CERTIFICATES.map((cert) => (
          <a
            key={cert.id}
            href={cert.file}
            download={cert.fileName}
            data-cursor="hover"
            className="btn-outline text-xs"
          >
            <FiDownload /> Download {cert.name.split(" ").slice(0, 2).join(" ")}
          </a>
        ))}
      </div>

      <div className="mt-6">
        <MagneticButton
          type="button"
          onClick={downloadAll}
          disabled={zipping}
          data-cursor="hover"
          aria-label="Download all documents as zip"
          className="btn-gold disabled:opacity-60"
        >
          {zipping ? <FiLoader className="animate-spin" /> : <FiPackage />}
          {zipping ? "Preparing ZIP..." : "Download All Documents"}
        </MagneticButton>
      </div>
    </div>
  );
}
