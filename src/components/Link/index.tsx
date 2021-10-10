import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import {LinkProps} from "next/dist/client/link";

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
    // @ts-ignore
    const { as, href, ...other } = props;


    // @ts-ignore
    return (<NextLink href={href} as={as}><a ref={ref} {...other} /></NextLink>);
});

NextComposed.propTypes = {
    // @ts-ignore
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
// @ts-ignore
function LinkBase(props) {
    const {
        href,
        activeClassName = 'active',
        className: classNameProps,
        innerRef,
        naked,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName,
    });

    if (naked) {
        return <NextComposed className={className} ref={innerRef} href={href} {...other} />;
    }

    return (
        <MuiLink component={NextComposed} className={className} ref={innerRef} href={href} {...other} />
    );
}

LinkBase.propTypes = {
    activeClassName: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    naked: PropTypes.bool,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool,
};

const LinkWrapped = React.forwardRef((props, ref) => <LinkBase {...props} innerRef={ref} />);

/**
 * Свойства ссылки
 */
interface Props extends LinkProps {
    className?: string
}

/**
 * Итоговая обертка над ссылками, для разрешения проблем типизации
 */
export default class Link extends React.Component<Props> {
    render() {
        // @ts-ignore
        return (<LinkWrapped {...this.props} />);
    }
}