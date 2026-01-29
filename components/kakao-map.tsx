'use client'

interface KakaoMapProps {
  className?: string
}

export function KakaoMap({ className = '' }: KakaoMapProps) {
  return (
    <div
      className={className}
      style={{ width: '100%' }}
      dangerouslySetInnerHTML={{
        __html: `
          <div style="font:normal normal 400 12px/normal dotum, sans-serif; width:100%; color:#333; position:relative; display: flex; flex-direction: column;">
            <div style="width: 100%; position: relative; padding-bottom: 56.25%;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                <a href="https://map.kakao.com/?urlX=443047.00000000035&urlY=1109513.0000000028&itemId=8689270&q=%ED%98%9C%EA%B4%91%EA%B5%90%ED%9A%8C&srcid=8689270&map_type=TYPE_MAP&from=roughmap" target="_blank" style="display: block; width: 100%; height: 100%;">
                  <img class="map" src="http://t1.daumcdn.net/roughmap/imgmap/6ef2e3c4b3ac5f97739da38f080582f8573ac8c5492d5398bace60d0c0add6d3" width="100%" height="100%" style="border:1px solid #ccc; object-fit: cover; display: block;">
                </a>
              </div>
            </div>
            <div style="overflow: hidden; padding: 7px 11px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 0px 0px 2px 2px; background-color: rgb(249, 249, 249);">
              <a href="https://map.kakao.com" target="_blank" style="float: left;">
                <img src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png" width="72" height="16" alt="카카오맵" style="display:block;width:72px;height:16px">
              </a>
              <div style="float: right; position: relative; top: 1px; font-size: 11px;">
                <a target="_blank" href="https://map.kakao.com/?from=roughmap&srcid=8689270&confirmid=8689270&q=%ED%98%9C%EA%B4%91%EA%B5%90%ED%9A%8C&rv=on" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">로드뷰</a>
                <span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span>
                <a target="_blank" href="https://map.kakao.com/?from=roughmap&eName=%ED%98%9C%EA%B4%91%EA%B5%90%ED%9A%8C&eX=443047.00000000035&eY=1109513.0000000028" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">길찾기</a>
                <span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span>
                <a target="_blank" href="https://map.kakao.com?map_type=TYPE_MAP&from=roughmap&srcid=8689270&itemId=8689270&q=%ED%98%9C%EA%B4%91%EA%B5%90%ED%9A%8C&urlX=443047.00000000035&urlY=1109513.0000000028" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">지도 크게 보기</a>
              </div>
            </div>
            <div>
              <span style="border-bottom:0px none #333333;position:absolute;left:-25px;top:-136px;width:0px;height:40px"></span>
            </div>
          </div>
        `,
      }}
    />
  )
}
