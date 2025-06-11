'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, Printer, Copy } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeDialogProps {
  asset: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeDialog({ asset, open, onOpenChange }: QRCodeDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (asset && open) {
      generateQRCode();
    }
  }, [asset, open]);

  const generateQRCode = async () => {
    if (!asset) return;
    
    setIsGenerating(true);
    try {
      // Create asset data for QR code
      const assetData = {
        id: asset.id,
        name: asset.name,
        type: asset.type,
        serialNumber: asset.serialNumber,
        manufacturer: asset.manufacturer,
        model: asset.model,
        url: `${window.location.origin}/asset/${asset.id}` // Future mobile app endpoint
      };

      const qrString = JSON.stringify(assetData);
      const qrDataUrl = await QRCode.toDataURL(qrString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: 'Error generating QR code',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl || !asset) return;

    const link = document.createElement('a');
    link.download = `${asset.id}-qr-code.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'QR Code downloaded',
      description: `QR code for ${asset.name} has been downloaded.`,
    });
  };

  const printQRCode = () => {
    if (!qrCodeUrl) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${asset.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 20px;
                margin: 0;
              }
              .qr-container {
                max-width: 400px;
                margin: 0 auto;
                border: 2px solid #000;
                padding: 20px;
                border-radius: 8px;
              }
              .asset-info {
                margin-bottom: 20px;
                text-align: left;
              }
              .asset-info h2 {
                margin: 0 0 10px 0;
                font-size: 18px;
              }
              .asset-info p {
                margin: 5px 0;
                font-size: 14px;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              @media print {
                body { margin: 0; }
                .qr-container { border: 2px solid #000; }
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <div class="asset-info">
                <h2>${asset.name}</h2>
                <p><strong>Asset ID:</strong> ${asset.id}</p>
                <p><strong>Type:</strong> ${asset.type}</p>
                <p><strong>Serial:</strong> ${asset.serialNumber}</p>
                ${asset.manufacturer ? `<p><strong>Manufacturer:</strong> ${asset.manufacturer}</p>` : ''}
                ${asset.model ? `<p><strong>Model:</strong> ${asset.model}</p>` : ''}
              </div>
              <img src="${qrCodeUrl}" alt="QR Code for ${asset.name}" />
              <p style="margin-top: 15px; font-size: 12px; color: #666;">
                Scan with mobile app to view/update asset details
              </p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }

    toast({
      title: 'QR Code sent to printer',
      description: `QR code label for ${asset.name} is ready to print.`,
    });
  };

  const copyAssetUrl = async () => {
    if (!asset) return;

    const assetUrl = `${window.location.origin}/asset/${asset.id}`;
    try {
      await navigator.clipboard.writeText(assetUrl);
      toast({
        title: 'Asset URL copied',
        description: 'The asset URL has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy URL',
        description: 'Please copy the URL manually.',
        variant: 'destructive',
      });
    }
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Asset QR Code</DialogTitle>
          <DialogDescription>
            QR code for {asset.name} ({asset.id})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Asset Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Asset Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Asset ID:</span>
                <span className="text-sm font-mono">{asset.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Name:</span>
                <span className="text-sm">{asset.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Type:</span>
                <Badge variant="outline">{asset.type}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Serial:</span>
                <span className="text-sm font-mono">{asset.serialNumber}</span>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <div className="text-center space-y-4">
            {isGenerating ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-500">Generating QR code...</p>
              </div>
            ) : qrCodeUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                    <img 
                      src={qrCodeUrl} 
                      alt={`QR Code for ${asset.name}`}
                      className="w-64 h-64"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Scan with your mobile app to view or update asset details
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Failed to generate QR code</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateQRCode}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {qrCodeUrl && (
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" onClick={downloadQRCode}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={printQRCode}>
                <Printer className="mr-2 h-4 w-4" />
                Print Label
              </Button>
              <Button variant="outline" size="sm" onClick={copyAssetUrl}>
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}