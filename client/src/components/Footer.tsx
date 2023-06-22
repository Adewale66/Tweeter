import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Text,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: "auto",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text color="dimmed" size="sm">
          © 2023 Adewale Kujore. All rights reserved.
        </Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon
            size="lg"
            component="a"
            href="https://twitter.com/__walee_"
            target="_blank"
          >
            <IconBrandTwitter size="1.33rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://github.com/Adewale66"
            target="_blank"
          >
            <IconBrandGithub size="1.33rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://linkedin.com/in/wale-kujore-a51450260"
            target="_blank"
          >
            <IconBrandLinkedin size="1.33rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
