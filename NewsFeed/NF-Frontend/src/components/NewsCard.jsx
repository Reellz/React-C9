import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function NewsCard({ id, title, author, content, excerpt, category, coverImage }) {
  const navigate = useNavigate();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {coverImage && (
        <Card.Section>
          <Image
            src={coverImage}
            height={160}
            alt={title}
          />
        </Card.Section>
      )}
      {/* Title */}
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={700} size="xl" lineClamp={2}>
          {title}
        </Text>
      </Group>

      {/* Author & Category */}
      <Group justify="space-between" mb="xs">
        <Badge color="blue" variant="light">
          {category}
        </Badge>
        <Text size="xs" c="dimmed">
          By: {author}
        </Text>
      </Group>

      {/* Excerpt */}
      <Text size="sm" c="dimmed" lineClamp={3}>
        {excerpt}
      </Text>

      <Text size="sm" c="dimmed" lineClamp={5}>
        {content}
      </Text> 

      {/* Read More Button */}
      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => navigate(`/news/:${id}`)}
      >
        Read More
      </Button>
    </Card>
  );
}

export default NewsCard;
