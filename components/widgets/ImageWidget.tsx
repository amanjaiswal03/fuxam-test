import React from 'react';
import { BaseWidget } from './BaseWidget';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageWidgetProps {
  imageUrl?: string;
  onDelete?: () => void;
  onSettings?: () => void;
}

export function ImageWidget({ imageUrl, onDelete, onSettings }: ImageWidgetProps) {
  return (
    <BaseWidget title="Image" onDelete={onDelete} onSettings={onSettings}>
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        {imageUrl ? (
          <Image src={imageUrl} alt="Widget" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="text-center text-gray-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">No image set</p>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}

