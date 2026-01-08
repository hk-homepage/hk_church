'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Download, Calendar } from 'lucide-react'

interface Bulletin {
  id: number
  date: string
  title: string
  image: string
}

interface BulletinGridProps {
  bulletins: Bulletin[]
}

export function BulletinGrid({ bulletins }: BulletinGridProps) {
  const [selectedBulletin, setSelectedBulletin] = useState<Bulletin | null>(null)

  const handleDownload = (e: React.MouseEvent, bulletin: Bulletin) => {
    e.stopPropagation()
    // 다운로드 로직 (추후 구현)
    const link = document.createElement('a')
    link.href = bulletin.image
    link.download = `${bulletin.title}.jpg`
    link.click()
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bulletins.map((bulletin) => (
          <Card
            key={bulletin.id}
            className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedBulletin(bulletin)}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={bulletin.image || '/placeholder.svg'}
                alt={bulletin.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {bulletin.date}
              </div>
              <CardTitle className="text-base">{bulletin.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={(e) => handleDownload(e, bulletin)}
              >
                <Download className="mr-2 h-4 w-4" />
                다운로드
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 이미지 팝업 */}
      <Dialog open={!!selectedBulletin} onOpenChange={(open) => !open && setSelectedBulletin(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none">
          {selectedBulletin && (
            <>
              <DialogTitle className="sr-only">{selectedBulletin.title}</DialogTitle>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="relative w-full aspect-[3/4] max-h-[85vh]">
                  <Image
                    src={selectedBulletin.image}
                    alt={selectedBulletin.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
                  <h3 className="font-semibold text-lg mb-1">{selectedBulletin.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <Calendar className="h-4 w-4" />
                    {selectedBulletin.date}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
