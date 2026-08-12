'use client';

import React, { useState, useEffect } from 'react';
import { Clipboard, Check, Trash2, File, Key, RefreshCw, Upload, AlertCircle } from 'lucide-react';
import md5 from 'blueimp-md5';

export default function HashGenerator() {
  const [inputText, setInputText] = useState('hello');
  const [md5Hash, setMd5Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');

  // File hashing state
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileProgress, setFileProgress] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Copied states
  const [copiedMd5, setCopiedMd5] = useState(false);
  const [copiedSha1, setCopiedSha1] = useState(false);
  const [copiedSha256, setCopiedSha256] = useState(false);
  const [copiedSha512, setCopiedSha512] = useState(false);

  // Compute text hashes
  const computeTextHashes = async (text: string) => {
    if (!text) {
      setMd5Hash('');
      setSha1Hash('');
      setSha256Hash('');
      setSha512Hash('');
      return;
    }

    // MD5 (using blueimp-md5)
    setMd5Hash(md5(text));

    // SHA-1, SHA-256, SHA-512 (using WebCrypto API)
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      const sha1Buffer = await window.crypto.subtle.digest('SHA-1', data);
      setSha1Hash(bufferToHex(sha1Buffer));

      const sha256Buffer = await window.crypto.subtle.digest('SHA-256', data);
      setSha256Hash(bufferToHex(sha256Buffer));

      const sha512Buffer = await window.crypto.subtle.digest('SHA-512', data);
      setSha512Hash(bufferToHex(sha512Buffer));
    } catch (err) {
      console.error('Error calculating WebCrypto digest:', err);
    }
  };

  const bufferToHex = (buffer: ArrayBuffer): string => {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    computeTextHashes(inputText);
  }, [inputText]);

  // Handle local file selection and hashing in chunks
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    hashFile(file);
  };

  const hashFile = async (file: File) => {
    setFileError(null);
    setFileName(file.name);
    setFileSize(file.size);
    setFileProgress(0);
    setInputText(''); // Clear text input to prevent confusion with file hashes

    const maxFileSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxFileSize) {
      setFileError('File too large. Maximum supported size is 500MB.');
      setFileProgress(null);
      return;
    }

    const reader = new FileReader();
    const chunkSize = 2 * 1024 * 1024; // 2MB chunking for reading progress
    let offset = 0;
    const chunks: ArrayBuffer[] = [];

    // Hashing functions are executed on the loaded buffer once fully assembled
    reader.onload = async (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        chunks.push(e.target.result);
      }

      offset += chunkSize;
      if (offset < file.size) {
        const progress = Math.round((offset / file.size) * 100);
        setFileProgress(progress);
        readNextChunk();
      } else {
        setFileProgress(100);
        // Assemble chunks
        const fileBuffer = await new Blob(chunks).arrayBuffer();
        try {
          // MD5 File Hash
          // Note: blueimp-md5 does not support ArrayBuffer directly; we convert the small buffer to a binary string or use FileReader readAsBinaryString
          const binaryString = await readBufferAsBinaryString(file);
          setMd5Hash(md5(binaryString));

          // WebCrypto SHA Hashes (Highly efficient natively)
          const sha1Buffer = await window.crypto.subtle.digest('SHA-1', fileBuffer);
          setSha1Hash(bufferToHex(sha1Buffer));

          const sha256Buffer = await window.crypto.subtle.digest('SHA-256', fileBuffer);
          setSha256Hash(bufferToHex(sha256Buffer));

          const sha512Buffer = await window.crypto.subtle.digest('SHA-512', fileBuffer);
          setSha512Hash(bufferToHex(sha512Buffer));

          setFileProgress(null);
        } catch (err) {
          console.error(err);
          setFileError('Failed to hash file content.');
          setFileProgress(null);
        }
      }
    };

    reader.onerror = () => {
      setFileError('Error reading file.');
      setFileProgress(null);
    };

    const readNextChunk = () => {
      const slice = file.slice(offset, offset + chunkSize);
      reader.readAsArrayBuffer(slice);
    };

    // If file is under 1MB, hash synchronously in one go without progress bar
    if (file.size <= 1 * 1024 * 1024) {
      const singleReader = new FileReader();
      singleReader.onload = async (e) => {
        const fileBuffer = e.target?.result as ArrayBuffer;
        if (!fileBuffer) return;
        try {
          const binaryString = await readBufferAsBinaryString(file);
          setMd5Hash(md5(binaryString));

          const sha1Buf = await window.crypto.subtle.digest('SHA-1', fileBuffer);
          setSha1Hash(bufferToHex(sha1Buf));

          const sha256Buf = await window.crypto.subtle.digest('SHA-256', fileBuffer);
          setSha256Hash(bufferToHex(sha256Buf));

          const sha512Buf = await window.crypto.subtle.digest('SHA-512', fileBuffer);
          setSha512Hash(bufferToHex(sha512Buf));
          setFileProgress(null);
        } catch (err) {
          setFileError('Failed to hash file content.');
        }
      };
      singleReader.readAsArrayBuffer(file);
    } else {
      readNextChunk();
    }
  };

  const readBufferAsBinaryString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => reject(r.error);
      r.readAsBinaryString(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      hashFile(file);
    }
  };

  const copyRow = async (text: string, setter: (val: boolean) => void) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Text Section */}
        <div className="space-y-4">
          <label htmlFor="hash-text" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Text String Input
          </label>
          <textarea
            id="hash-text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setFileName(null);
            }}
            placeholder="Type text to generate hashes..."
            className="w-full h-32 p-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>

        {/* File Drag-and-Drop Section */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Or Hash a File (Up to 500MB)
          </span>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="h-32 border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-center p-4 bg-gray-50/20 dark:bg-gray-900/10 cursor-pointer transition-all relative"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload file for hashing"
            />
            <Upload className="h-6 w-6 text-slate-400 mb-1.5" />
            <span className="text-xs font-semibold text-slate-500">
              Drag & Drop file here or <span className="text-blue-600 dark:text-blue-450 hover:underline">browse</span>
            </span>
            {fileName && (
              <span className="text-[10px] font-bold text-slate-400 mt-2 font-mono truncate max-w-full">
                {fileName} ({Math.round(fileSize / 1024)} KB)
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Progress & Error banners */}
      {fileProgress !== null && (
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
          <div
            style={{ width: `${fileProgress}%` }}
            className="bg-blue-600 h-full transition-all duration-300"
          />
        </div>
      )}

      {fileError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-650 dark:text-red-400 text-xs rounded-xl font-semibold flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{fileError}</span>
        </div>
      )}

      {/* Output Hashes Section */}
      <div className="bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 space-y-4 shadow-md">
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 dark:text-blue-400">
          Generated Hashes
        </h3>

        <div className="space-y-4 font-mono">
          
          {/* MD5 Row */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-blue-300 dark:text-blue-400">
              <span>MD5 (Checksum)</span>
              <button
                onClick={() => copyRow(md5Hash, setCopiedMd5)}
                className="flex items-center gap-1 hover:text-white transition-all text-xs font-semibold cursor-pointer bg-transparent border-none p-1"
              >
                {copiedMd5 ? <Check className="h-3 w-3 text-green-400" /> : <Clipboard className="h-3 w-3" />}
                <span>{copiedMd5 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={md5Hash || 'Waiting for input...'}
              className="w-full text-xs p-2 rounded bg-blue-900/40 border border-blue-800/40 text-white focus:outline-none resize-none h-9 font-mono"
            />
          </div>

          {/* SHA-1 Row */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-blue-300 dark:text-blue-400">
              <span>SHA-1</span>
              <button
                onClick={() => copyRow(sha1Hash, setCopiedSha1)}
                className="flex items-center gap-1 hover:text-white transition-all text-xs font-semibold cursor-pointer bg-transparent border-none p-1"
              >
                {copiedSha1 ? <Check className="h-3 w-3 text-green-400" /> : <Clipboard className="h-3 w-3" />}
                <span>{copiedSha1 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={sha1Hash || 'Waiting for input...'}
              className="w-full text-xs p-2 rounded bg-blue-900/40 border border-blue-800/40 text-white focus:outline-none resize-none h-9 font-mono"
            />
          </div>

          {/* SHA-256 Row */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-blue-300 dark:text-blue-400">
              <span>SHA-256 (Recommended for Security)</span>
              <button
                onClick={() => copyRow(sha256Hash, setCopiedSha256)}
                className="flex items-center gap-1 hover:text-white transition-all text-xs font-semibold cursor-pointer bg-transparent border-none p-1"
              >
                {copiedSha256 ? <Check className="h-3 w-3 text-green-400" /> : <Clipboard className="h-3 w-3" />}
                <span>{copiedSha256 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={sha256Hash || 'Waiting for input...'}
              className="w-full text-xs p-2 rounded bg-blue-900/40 border border-blue-800/40 text-white focus:outline-none resize-none h-9 font-mono"
            />
          </div>

          {/* SHA-512 Row */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-blue-300 dark:text-blue-400">
              <span>SHA-512</span>
              <button
                onClick={() => copyRow(sha512Hash, setCopiedSha512)}
                className="flex items-center gap-1 hover:text-white transition-all text-xs font-semibold cursor-pointer bg-transparent border-none p-1"
              >
                {copiedSha512 ? <Check className="h-3 w-3 text-green-400" /> : <Clipboard className="h-3 w-3" />}
                <span>{copiedSha512 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={sha512Hash || 'Waiting for input...'}
              className="w-full text-xs p-2 rounded bg-blue-900/40 border border-blue-800/40 text-white focus:outline-none resize-none h-16 font-mono"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
