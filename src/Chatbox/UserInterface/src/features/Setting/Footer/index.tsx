import { Icon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { MessageSquareHeart } from 'lucide-react';
import { PropsWithChildren, memo, useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import GuideModal from '@/components/GuideModal';
import GuideVideo from '@/components/GuideVideo';
import { Link } from 'react-router-dom';

const useStyles = createStyles(
    ({ css, token }) => css`
    font-size: 12px;
    color: ${token.colorTextSecondary};
  `,
);

const Footer = memo<PropsWithChildren>(() => {
    const [openStar, setOpenStar] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const { styles } = useStyles();

    return (
        <>
            <Flexbox flex={1} justify={'flex-end'}>
                <Center
                    as={'footer'}
                    className={styles}
                    flex={'none'}
                    horizontal
                    padding={16}
                    width={'100%'}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Icon icon={MessageSquareHeart} /> 喜欢我们的产品？
                        <Link
                            aria-label={'star'}
                            to={'https://github.com/AIDotNet/Fast-wiki'}
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenStar(true);
                            }}
                        >
                            在 GitHub 给添加星标
                        </Link>
                        并
                        <Link
                            aria-label={'feedback'}
                            to={'https://github.com/AIDotNet/Fast-wiki/issues'}
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenFeedback(true);
                            }}
                        >
                            分享您宝贵的建议
                        </Link>
                        {' !'}
                    </div>
                </Center>
            </Flexbox>
            <GuideModal
                cancelText="稍后"
                cover={<GuideVideo height={269} src={'/videos/star.mp4?v=1'} width={358} />}
                desc="如果您喜爱我们的产品，并希望支持我们，可以去 GitHub 给我们点一颗星吗？这个小小的动作对我们来说意义重大，能激励我们为您持续提供特性体验。"
                okText="点亮星标"
                onCancel={() => setOpenStar(false)}
                onOk={() => {
                    window.open('https://github.com/AIDotNet/Fast-wiki', '__blank');
                }}
                open={openStar}
                title="在 GitHub 为我们点亮星标"
            />
            <GuideModal
                cancelText="稍后"
                cover={<GuideVideo height={269} src={'/videos/feedback.mp4?v=1'} width={358} />}
                desc="您的每一个想法和建议对我们来说都弥足珍贵，我们迫不及待地想知道您的看法！欢迎联系我们提供产品功能和使用体验反馈，帮助我们将 {{appName}} 建设得更好。"
                okText="分享反馈"
                onCancel={() => setOpenFeedback(false)}
                onOk={() => {
                    window.open('https://github.com/AIDotNet/Fast-wiki/issues', '__blank');
                }}
                open={openFeedback}
                title="在 GitHub 分享您宝贵的反馈"
            />
        </>
    );
});

export default Footer;
