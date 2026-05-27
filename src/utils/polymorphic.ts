import type * as React from 'react'

type AsProp<T extends React.ElementType> = {
  as?: T
}

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProp<T> & P)

type PolymorphicComponentProp<
  T extends React.ElementType,
  Props = Record<string, never>,
> = React.PropsWithChildren<Props & AsProp<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref']

export type PolymorphicComponentProps<
  T extends React.ElementType,
  P = Record<string, never>,
> = PolymorphicComponentProp<T, P>
