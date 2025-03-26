import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="start" mx="40" mt={200}>
        <Text className={classes.title} variant="gradient" component="span">
          progressive
        </Text>

        <Text className={classes.title2} component="span" c={'pridePurple'}>
          p
        </Text>
        <Text className={classes.title2} component="span" c={'prideBlue'}>
          e
        </Text>
        <Text className={classes.title2} component="span" c={'prideGreen'}>
          d
        </Text>
        <Text className={classes.title2} component="span" c={'prideYellow'}>
          a
        </Text>
        <Text className={classes.title2} component="span" c={'prideOrange'}>
          l
        </Text>
        <Text className={classes.title2} component="span" c={'prideRed'}>
          s
        </Text>
      </Title>
      <Title c={'darkest'} ta="end" size="xl" mx="40" mt="150">
        progressive tools for progressive players
      </Title>
    </>
  );
}
